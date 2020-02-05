from __future__ import absolute_import
from __future__ import division
from __future__ import print_function
from flask import Flask, request, redirect,render_template,make_response
import tensorflow as tf
import keras
from keras.layers import Lambda, Input, Dense
from keras.models import Model
from keras.datasets import mnist
from keras.losses import mse, binary_crossentropy
from keras.utils import plot_model
from keras import backend as K
from keras.models import load_model
from keras.models import Sequential
from keras.layers import Dense, Dropout, Flatten
from keras.layers import Conv2D, MaxPooling2D, GlobalAveragePooling2D
import numpy as np
import matplotlib.pyplot as plt
import argparse
import os
import pandas as pd
import json
import matplotlib
from matplotlib.image import imread
from keras.models import load_model
from numpy.random import rand
import random
from sklearn.preprocessing import minmax_scale
from keras.applications.resnet50 import ResNet50



app = Flask(__name__)

names = []

@app.route('/', methods=['GET'])
def server():   
    return render_template('outline.html',names=None)


@app.route('/vaeInput', methods=['GET'])
def vaeImage():
    if request.method == 'GET':
        vaeInput = request.args.get('vaeImage')

        original_dim = 28*28
        input_shape = (original_dim, )
        intermediate_dim = 512
        latent_dim = 10

        def sampling(args):
            z_mean, z_log_var = args
            batch = K.shape(z_mean)[0]
            dim = K.int_shape(z_mean)[1]
            epsilon = K.random_normal(shape=(batch, dim))
            return z_mean + K.exp(0.5 * z_log_var) * epsilon

        inputs = Input(shape=input_shape, name='encoder_input')
        x = Dense(intermediate_dim, activation='relu')(inputs)
        z_mean = Dense(latent_dim, name='z_mean')(x)
        z_log_var = Dense(latent_dim, name='z_log_var')(x)

        z = Lambda(sampling, output_shape=(latent_dim,), name='z')([z_mean, z_log_var])

        encoder = Model(inputs, [z_mean, z_log_var, z], name='encoder')

        latent_inputs = Input(shape=(latent_dim,), name='z_sampling')
        x = Dense(intermediate_dim, activation='relu')(latent_inputs)
        outputs = Dense(original_dim, activation='sigmoid')(x)

        decoder = Model(latent_inputs, outputs, name='decoder')

        outputs = decoder(encoder(inputs)[2])
        vae = Model(inputs, outputs, name='vae_mlp')

        vae.load_weights('./static/vae_mlp_mnist.h5')

        x_train = imread(vaeInput)

        x_train = x_train.astype('float32')
        x_train = np.reshape(x_train,(-1,28*28,))
        vae_out = vae.predict(x_train)
        print(vae_out.shape)
        img = np.reshape(vae_out,(28,28))
        matplotlib.image.imsave('./static/vae_single/vae.png', img, cmap='gray')

        temp_latent = np.array(encoder.predict(x_train))[2]
        temp_latent = np.reshape(temp_latent,(10,))

        latent_rep = {}
        for i in range(temp_latent.shape[0]):
            latent_rep.update({'d{}'.format(i): '{}'.format(temp_latent[i])}) 
        latent_rep = json.dumps(latent_rep)
        # print([latent_rep])
        K.clear_session()
        del vae
        return make_response("".join(latent_rep),200)
    
@app.route('/updateVaeInput', methods=['GET'])
def updateVaeImage():
    if request.method == 'GET':
        original_dim = 28*28
        input_shape = (original_dim, )
        intermediate_dim = 512
        latent_dim = 10
        epochs = 1

        samples_ = int(request.args.get('samples'))
        #print(request.form['samples'])
        #samples_ = int(request.form['samples'])
        
        num=int(int(request.args.get('bandwidth'))/10.0)
        #print(request.form['bandwidth'])
        #print(type(request.form['bandwidth']))
        #num=int(int(request.form['bandwidth'])/10.0)
        vaeLatentVectorInput = request.args.get('vaeInput')
       

        def sampling(args):
            z_mean, z_log_var = args
            batch = K.shape(z_mean)[0]
            dim = K.int_shape(z_mean)[1]
            epsilon = K.random_normal(shape=(batch, dim))
            return z_mean + K.exp(0.5 * z_log_var) * epsilon

        inputs = Input(shape=input_shape, name='encoder_input')
        x = Dense(intermediate_dim, activation='relu')(inputs)
        z_mean = Dense(latent_dim, name='z_mean')(x)
        z_log_var = Dense(latent_dim, name='z_log_var')(x)

        z = Lambda(sampling, output_shape=(latent_dim,), name='z')([z_mean, z_log_var])

        encoder = Model(inputs, [z_mean, z_log_var, z], name='encoder')

        latent_inputs = Input(shape=(latent_dim,), name='z_sampling')
        x = Dense(intermediate_dim, activation='relu')(latent_inputs)
        outputs = Dense(original_dim, activation='sigmoid')(x)


        decoder = Model(latent_inputs, outputs, name='decoder')

        outputs = decoder(encoder(inputs)[2])
        vae = Model(inputs, outputs, name='vae_mlp')

        vae.load_weights('./static/vae_mlp_mnist.h5')

        #with open('./static/result.json', 'r') as f:
        vaeLatentVectorInput = json.loads(vaeLatentVectorInput)
        
        print(vaeLatentVectorInput)
        #temp_latent = json.load(vaeLatentVectorInput)
        temp_latent = np.array([float(x) for x in list(vaeLatentVectorInput.values())])
        print(temp_latent)
        #temp_latent = np.array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

        v_1 = np.random.uniform((temp_latent[0]-(num/2)),(temp_latent[0]+(num/2)),samples_)
        v_2 = np.random.uniform((temp_latent[1]-(num/2)),(temp_latent[1]+(num/2)),samples_)
        v_3 = np.random.uniform((temp_latent[2]-(num/2)),(temp_latent[2]+(num/2)),samples_)
        v_4 = np.random.uniform((temp_latent[3]-(num/2)),(temp_latent[3]+(num/2)),samples_)
        v_5 = np.random.uniform((temp_latent[4]-(num/2)),(temp_latent[4]+(num/2)),samples_)
        v_6 = np.random.uniform((temp_latent[5]-(num/2)),(temp_latent[5]+(num/2)),samples_)
        v_7 = np.random.uniform((temp_latent[6]-(num/2)),(temp_latent[6]+(num/2)),samples_)
        v_8 = np.random.uniform((temp_latent[7]-(num/2)),(temp_latent[7]+(num/2)),samples_)
        v_9 = np.random.uniform((temp_latent[8]-(num/2)),(temp_latent[8]+(num/2)),samples_)
        v_10 = np.random.uniform((temp_latent[9]-(num/2)),(temp_latent[9]+(num/2)),samples_)

        l = np.array([v_1, v_2, v_3, v_4, v_5, v_6, v_7, v_8, v_9, v_10])
        l = np.transpose(l)

        images = np.array(decoder.predict(l))
        images = np.reshape(images,(-1,28,28))

        base_model = ResNet50(weights=None, include_top=False)

        x = base_model.output
        x = GlobalAveragePooling2D()(x)
        # let's add a fully-connected layer
        x = Dense(1024, activation='relu')(x)
        # and a logistic layer -- let's say we have 200 classes
        predictions = Dense(10, activation='softmax')(x)

        # this is the model we will train
        teacher = Model(inputs=base_model.input, outputs=predictions)

        # first: train only the top layers (which were randomly initialized)
        # i.e. freeze all convolutional InceptionV3 layers
        # for layer in base_model.layers:
        #     layer.trainable = False

        # # compile the model (should be done *after* setting layers to non-trainable)
        # model.compile(loss=keras.losses.categorical_crossentropy,
        #             optimizer=keras.optimizers.Adadelta(),
        #             metrics=['accuracy'])

        teacher.load_weights("./static/teacher_weights.h5")

        # teacher = load_model("./static/teacher.h5")
        # teacher.save("teacher_weights.h5")
        # images = np.reshape(images,(-1,28,28,1))
        s = np.squeeze(np.stack((images,) * 3, -1))
        labels = teacher.predict(s)
        # images = np.reshape(images,(-1,28,28))
        x_student = np.array(images)
        labels = np.argmax(labels, axis=1)
        print(images.shape)
        model1 = Sequential()
        # model1.add(Dense(32, activation='relu', input_dim=784))
        model1.add(Dense(10, activation='softmax',input_dim = 784))
        model1.compile(optimizer=keras.optimizers.SGD( momentum=0.0, nesterov=False),
                    loss='categorical_crossentropy',
                    metrics=['accuracy'])
        # Convert labels to categorical one-hot encoding
        y_student = keras.utils.to_categorical(labels, num_classes=10)

        # Train the model, iterating on the data in batches of 32 samples
        # model.fit(data, one_hot_labels, epochs=10, batch_size=32)
        x_student = x_student.reshape(-1,784)

        model1.fit(x_student, y_student, epochs=50, batch_size=64)
        temp = model1.get_weights()
        restructured = temp[0].reshape(28,28,10)
        
        vaeSelectedImage = request.args.get('vaeSelectedImage')
        print(vaeSelectedImage)
        print("VAE Selected Image")
        # vaei = request.args.get('vaeImage')
        tempp = matplotlib.image.imread(vaeSelectedImage)
        print(tempp.shape)
        print(restructured.shape)

        for i in range(10):
            im = restructured[:,:,i]
            im_new = np.multiply(im,tempp)
            matplotlib.image.imsave('./static/student_weights/'+str(i)+".png",im,cmap='gray')
            matplotlib.image.imsave('./static/student_weights_imposed/'+str(i)+".png",im_new,cmap='gray')
  

        names = []
        for i in range(images.shape[0]):
            matplotlib.image.imsave('./static/generated_images/{}.png'.format(i), images[i,:,:], cmap='gray')
            names.append('{}.png'.format(i))
        
        restructured  = np.uint8(restructured)
        restructured =  minmax_scale(restructured[:,:,0])


        names1 = {'images':names}
        names1 = json.dumps(names1)
        K.clear_session()
        del vae
        return make_response("".join(names1),200)
        #return render_template('outline.html',names=names1)

if __name__ == '__main__':
    app.run(host='localhost')
