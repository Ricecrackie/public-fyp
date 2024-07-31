from base64 import decode
import numpy as np
import time
import shamir

def text_split(text, n, k):
    if (not isinstance(text,str)):
        return None
    start = time.time()
    text_bytes = text.encode('utf-8')
    s = len(text_bytes)
    result = []
    result_array = np.zeros((n,s*2),dtype=np.uint8)
    X = np.zeros((n,s),dtype=np.uint8)
    Y = np.zeros((n,s),dtype=np.uint8)

    ctr = 0
    for t in text_bytes:
        shares = shamir.split(t,n,k)
        X[:,ctr] = np.array([x[0] for x in shares])
        Y[:,ctr] = np.array([x[1] for x in shares])
        ctr += 1

    result_array[:,0:s] = X
    result_array[:,s:] = Y

    print(result_array)
    result = [x.tobytes().hex() for x in result_array]
    print("hex", result)
    # result = [x.to_bytes(x.bit_length() + 7).decode(encoding='utf-8', errors='strict') for x in result]
    # print(result)
    end = time.time()
    print("Time taken for text split: ", end-start," seconds.")
    return result
        

def text_combine(texts):
    start = time.time()
    k = len(texts)
    s = len(texts[0])
    for t in texts:
        if (not isinstance(t,str) or len(t)!=s):
            return 'error'
    byte_arr = np.zeros((k,int(s/2)),dtype=np.uint8)
    for i in range(k):
        for j in range(0,s,2):
            j_2 = int(j/2)
            byte_arr[i,j_2] = int(texts[i][j:j+2],16)

    secret_length = int(s/4)
    
    X = byte_arr[:,0:secret_length]
    Y = byte_arr[:,secret_length:]
    XY = np.stack((X,Y),axis=-1)
    XY = np.transpose(XY, (1,0,2))

    result = ""
    result_bytes = bytearray()
    for i in range(secret_length):
        shares = XY[i].tolist()
        c = shamir.combine(k, shares)
        result_bytes.append(c)

    # Decode the combined bytes back to a UTF-8 string
    try:
        result = result_bytes.decode('utf-8')
    except:
        return 0
    return result

    

#sample = text_split("Hello World",5,3)
#print(sample)
#print(text_combine(sample[:4]))
