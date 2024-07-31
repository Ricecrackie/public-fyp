from flask import Flask, render_template,request, send_file, jsonify, session, redirect
import os
from flask_cors import CORS
import numpy as np
import ast
#from shamir import split
#from shamir import combine
from image import image_split, image_fast_split
from image import  image_reconstruct
from text import text_split
from text import text_combine
import imageio.v2 as imageio

app=Flask(__name__)
CORS(app)
@app.route("/")
def home():
    return "hello"

@app.route('/print', methods=['POST','GET']) #text split
def print_input():
#    if request.method=="POST":
        k = int(request.form.get('k'))#3
        n = int(request.form.get('n'))#5
        s = None
        if request.form.get('splitMode'): # File upload
            fnames=[]
            #  if 'file' in request.files:
            file = request.files['split-text-file-upload']
            if (file and k and n):
                s = file.read().decode("utf-8")
                # return '1'
            else: 
                return jsonify({'result': ['please select a file/specify the number of shares!']})
        else: # Text entry
            s = request.form.get('txtField')
        
        #return str(type(s) is str)
        if (type(s) is str):
            r = text_split(s, n, k) # a = 97
            return jsonify({'result': r})
        else:
            return jsonify({'result': ['Wrong type string!']})

#        return f'Input received and printed ${r} ${type(r)}'
@app.route('/combine_text', methods=['POST','GET'])
def combine_input():
        r = []
        s = ""
        if request.form.get('combineMode'):
            files = request.files.getlist('combine-text-file-upload')
            if files:
                k = len(files)
                for i in range(k):
                    file = files[i]
                    s = file.read().decode("utf-8")
                    r.append(s)
            else: 
                return jsonify({'result': 'please select a file'})
        else:
            k = int(request.form.get('combine-k'))
            for i in range(k):
                r.append(request.form.get("tf"+str(i)))
        s = text_combine(r)
        if (not s):
            #return jsonify({'error': 'Failed to reconstruct the secret due to insufficient / incorrect shares'})
            return jsonify({'error': [k]})
        return jsonify({'result': [s]})

@app.route('/split_image', methods=['POST'])
def print_input2():
#    if request.method=="POST":
        k = int(request.form.get('k'))#3
    #
    # 
        n = int(request.form.get('n'))#5
        fnames=[]
      #  if 'file' in request.files:
        file = request.files['split-image-file-upload']
        algotype = request.form.get('radio-buttons-group')

        if(file and k and n):
            # return '1'
            sample_image = imageio.imread(file)
            hasAlpha = sample_image.shape[2] == 4
            if (algotype == "0"):
                r = image_split(sample_image, n, k, hasAlpha)
            else:
                r = image_fast_split(sample_image, n, k, hasAlpha)
            for i in range(n):
                 fnames.append(str(i)+'.png')
            return jsonify({'result': fnames})
        else:
          return jsonify({'result': ['please select a file/specify the number of shares!']})

@app.route('/combine_image', methods=['POST','GET'])
def combine_input2():
        #k = int(request.form.get('combine-k'))
        files = request.files.getlist('combine-image-file-upload')
        if files:
            k = len(files)
            sample_shares = []
            hasAlpha = False
            #return jsonify({'error': 'unmatched alpha, some images have alpha while some does not.'})
            for i in range(k):
                file = files[i]
                imgFile = imageio.imread(file)
                if (i == 0):
                    hasAlpha = imgFile.shape[2] == 4
                share = np.array(imgFile)
                sample_shares.append(share)
            sample_shares=np.array( sample_shares) 
            #print("server", sample_shares.shape, k)
            image_reconstruct(sample_shares, hasAlpha)
            return jsonify({'result': ['reconstructed.png']})
        else: 
          return jsonify({'error': ['unknown error']})

@app.route('/display_image/<fname>')
def display_image(fname):
    # Return the image file
    return send_file(fname, mimetype='image/png')
@app.route('/download/<item>')
def download_item(item):
    filename = f"item{item}.txt"
   
    with open( filename, 'w') as file:
        file.write(item)
    return send_file( filename, as_attachment=True)
'''@app.route('/download/<image>')
def download_item(image):
    filename = f"image{image}.png"
   
    with open( filename, 'w') as file:
        file.write(image)
    return send_file( filename, as_attachment=True)
   '''            


if __name__=="__main__":
    app.run(debug=True)