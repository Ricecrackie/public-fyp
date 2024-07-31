import numpy as np
import imageio.v2 as imageio
import shamir
import time
import cv2 as cv
from PIL import Image

filename = "{index}.png" # do not modify extension
#sample_image = imageio.imread('icon.jpg')

#print(sample_image.shape)

def image_split(img, n, k, hasAlpha):
    h = img.shape[0]
    w = img.shape[1]
    result = np.zeros((n,h*2, w,3), dtype=np.uint8)

    # shape = [h,w], split the channels of the image to 3 arrays
    red, green, blue = [np.zeros((h,w),dtype=np.uint8) for _ in range(3)]

    #split the x and y of each channel for each pixel
    redX, redY, greenX, greenY, blueX, blueY = [np.zeros((n,h,w),dtype=np.uint8) for _ in range(6)]

    if (hasAlpha): # With alpha
        red, green, blue, alpha = np.split(img, 4, axis=2)
        alphaX, alphaY = [np.zeros((n,h,w),dtype=np.uint8) for _ in range(2)]
        red = red.reshape(h,w)
        green = green.reshape(h,w)
        blue = blue.reshape(h,w)
        alpha = alpha.reshape(h,w)

        print("Initialization finished. Spliting secret...")
        start = time.time()
        for i in range(h):
            for j in range(w):
                red_share = shamir.split(red[i][j],n,k)
                redX[:,i,j] = np.array([x[0] for x in red_share])
                redY[:,i,j] = np.array([x[1] for x in red_share])
                        
                green_share = shamir.split(green[i][j],n,k)
                greenX[:,i,j] = np.array([x[0] for x in green_share])
                greenY[:,i,j] = np.array([x[1] for x in green_share])

                blue_share = shamir.split(blue[i][j],n,k)
                blueX[:,i,j] = np.array([x[0] for x in blue_share])
                blueY[:,i,j] = np.array([x[1] for x in blue_share])

                alpha_share = shamir.split(alpha[i][j],n,k)
                alphaX[:,i,j] = np.array([x[0] for x in alpha_share])
                alphaY[:,i,j] = np.array([x[1] for x in alpha_share])
        end = time.time()
        print("Secret splited. Time taken: ", end-start," seconds. Constructing shares...")
        r = np.hstack((redX,redY))
        g = np.hstack((greenX,greenY))
        b = np.hstack((blueX,blueY))
        a = np.hstack((alphaX,alphaY))
        result = np.stack((r,g,b,a),axis=-1)

    else: # No alpha
        red, green, blue = np.split(img, 3, axis=2)
        red = red.reshape(h,w)
        green = green.reshape(h,w)
        blue = blue.reshape(h,w)
        print("Initialization finished. Spliting secret...")
        start = time.time()
        for i in range(h):
            for j in range(w):
                red_share = shamir.split(red[i][j],n,k)
                redX[:,i,j] = np.array([x[0] for x in red_share])
                redY[:,i,j] = np.array([x[1] for x in red_share])
                        
                green_share = shamir.split(green[i][j],n,k)
                greenX[:,i,j] = np.array([x[0] for x in green_share])
                greenY[:,i,j] = np.array([x[1] for x in green_share])

                blue_share = shamir.split(blue[i][j],n,k)
                blueX[:,i,j] = np.array([x[0] for x in blue_share])
                blueY[:,i,j] = np.array([x[1] for x in blue_share])
        end = time.time()
        #print("Secret splited. Time taken: ", end-start," seconds. Constructing shares...")
        r = np.hstack((redX,redY))
        g = np.hstack((greenX,greenY))
        b = np.hstack((blueX,blueY))
        result = np.stack((r,g,b),axis=-1)
        #print(result.shape)

    for i in range(n):
        result_img = Image.fromarray(result[i])
        result_img.save(filename.format(index=i))

    #print("Shares construction finished.")

    #print("redX: ",redX[:,0,0])
    #print("redY: ",redY[:,0,0])
    #print("(0,0) for share 0: ", result[0,0,0,0])

###     Test for image split
#image_split(sample_image, 5, 3)

def image_fast_split(img, n, k, hasAlpha):
    h = img.shape[0]
    w = img.shape[1]
    result = np.zeros((n,h*2, w,3), dtype=np.uint8)

    # shape = [h,w], split the channels of the image to 3 arrays
    red, green, blue = [np.zeros((h,w),dtype=np.uint8) for _ in range(3)]
    
    #split the x and y of each channel for each pixel
    redX, redY, greenX, greenY, blueX, blueY = [np.zeros((n,h,w),dtype=np.uint8) for _ in range(6)]
    
    img_fast_split_arr = np.zeros((256,n,2),dtype=np.uint8)
    for i in range(256):
        img_fast_split_arr[i] = np.array(shamir.split(i,n,k))
    
    if (hasAlpha): # With alpha
        red, green, blue, alpha = np.split(img, 4, axis=2)
        alphaX, alphaY = [np.zeros((n,h,w),dtype=np.uint8) for _ in range(2)]
        red = red.reshape(h,w)
        green = green.reshape(h,w)
        blue = blue.reshape(h,w)
        alpha = alpha.reshape(h,w)

        print("Initialization finished. Spliting secret...")
        start = time.time()
        for i in range(h):
            for j in range(w):           
                tmp = np.split(img_fast_split_arr[red[i][j]],2,axis=1)
                redX[:,i,j] = tmp[0].flatten()
                redY[:,i,j] = tmp[1].flatten()

                tmp = np.split(img_fast_split_arr[green[i][j]],2,axis=1)
                greenX[:,i,j] = tmp[0].flatten()
                greenY[:,i,j] = tmp[1].flatten()

                tmp = np.split(img_fast_split_arr[blue[i][j]],2,axis=1)
                blueX[:,i,j] = tmp[0].flatten()
                blueY[:,i,j] = tmp[1].flatten()

                tmp = np.split(img_fast_split_arr[alpha[i][j]],2,axis=1)
                alphaX[:,i,j] = tmp[0].flatten()
                alphaY[:,i,j] = tmp[1].flatten()
        end = time.time()
        print("Secret splited. Time taken: ", end-start," seconds. Constructing shares...")
        
        r = np.hstack((redX,redY))
        g = np.hstack((greenX,greenY))
        b = np.hstack((blueX,blueY))
        a = np.hstack((alphaX,alphaY))
        result = np.stack((r,g,b,a),axis=-1)  

    else: # No alpha
        red, green, blue = np.split(img, 3, axis=2)
        red = red.reshape(h,w)
        green = green.reshape(h,w)
        blue = blue.reshape(h,w)
        print("Initialization finished. Spliting secret...")
        start = time.time()
        for i in range(h):
            for j in range(w):           
                tmp = np.split(img_fast_split_arr[red[i][j]],2,axis=1)
                redX[:,i,j] = tmp[0].flatten()
                redY[:,i,j] = tmp[1].flatten()

                tmp = np.split(img_fast_split_arr[green[i][j]],2,axis=1)
                greenX[:,i,j] = tmp[0].flatten()
                greenY[:,i,j] = tmp[1].flatten()

                tmp = np.split(img_fast_split_arr[blue[i][j]],2,axis=1)
                blueX[:,i,j] = tmp[0].flatten()
                blueY[:,i,j] = tmp[1].flatten()
        end = time.time()
        print("Secret splited. Time taken: ", end-start," seconds. Constructing shares...")
        r = np.hstack((redX,redY))
        g = np.hstack((greenX,greenY))
        b = np.hstack((blueX,blueY))
        result = np.stack((r,g,b),axis=-1)

    for i in range(n):
        result_img = Image.fromarray(result[i])
        result_img.save(filename.format(index=i))

    print("Shares construction finished.")
    #print("(0,0) for share 0: ", result[0,0,0,0])

###     Test for image fast split
#image_fast_split(sample_image, 5, 3)

def image_reconstruct(images, hasAlpha):
    k = images.shape[0]
    h = int(images.shape[1]/2)
    w = images.shape[2]

    redX = images[:,0:h,:,0].transpose(1,2,0)
    redY = images[:,h:,:,0].transpose(1,2,0)
    greenX = images[:,0:h,:,1].transpose(1,2,0)
    greenY = images[:,h:,:,1].transpose(1,2,0)
    blueX = images[:,0:h,:,2].transpose(1,2,0)
    blueY = images[:,h:,:,2].transpose(1,2,0)

    red = np.stack((redX,redY),axis=-1)
    green = np.stack((greenX,greenY),axis=-1)
    blue = np.stack((blueX,blueY),axis=-1)

    if (hasAlpha):
        alphaX = images[:,0:h,:,3].transpose(1,2,0)
        alphaY = images[:,h:,:,3].transpose(1,2,0)
        alpha = np.stack((alphaX,alphaY),axis=-1)
        result = np.zeros((h,w,4), dtype=np.uint8)   
        for i in range(h):
            for j in range(w):
                red_shares = red[i,j,:,:].tolist()
                result[i,j,0] = shamir.combine(k,red_shares)
                green_shares = green[i,j,:,:].tolist()
                result[i,j,1] = shamir.combine(k,green_shares)
                blue_shares = blue[i,j,:,:].tolist()
                result[i,j,2] = shamir.combine(k,blue_shares)
                alpha_shares = alpha[i,j,:,:].tolist()
                result[i,j,3] = shamir.combine(k,alpha_shares)

    else:
        result = np.zeros((h,w,3), dtype=np.uint8)   
        for i in range(h):
            for j in range(w):
                red_shares = red[i,j,:,:].tolist()
                result[i,j,0] = shamir.combine(k,red_shares)
                green_shares = green[i,j,:,:].tolist()
                result[i,j,1] = shamir.combine(k,green_shares)
                blue_shares = blue[i,j,:,:].tolist()
                result[i,j,2] = shamir.combine(k,blue_shares)
            
    result_img = Image.fromarray(result)
    result_img.save("reconstructed.png")
    print("reconstruction finished")

###     Test for image reconstruction
#sample_shares = np.array([imageio.imread(filename.format(index=i)) for i in range(5)])
#image_reconstruct(sample_shares[:4])
#sample_shares = np.array([imageio.imread(filename.format(index=i)) for i in range(2)])
#image_reconstruct(sample_shares, True)    

#print(sample_shares.shape)
#shape = (k, h*2, w, 3)
