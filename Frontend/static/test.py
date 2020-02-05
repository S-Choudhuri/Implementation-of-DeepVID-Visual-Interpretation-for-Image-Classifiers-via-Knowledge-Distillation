from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

import tensorflow as tf
from keras.layers import Lambda, Input, Dense
from keras.models import Model
from keras.datasets import mnist
from keras.losses import mse, binary_crossentropy
from keras.utils import plot_model
from keras import backend as K
from keras.models import load_model

import numpy as np
import matplotlib.pyplot as plt
import argparse
import os
import pandas as pd
import json
import matplotlib
from matplotlib.image import imread

from numpy.random import rand
import random

original_dim = 28*28
input_shape = (original_dim, )
intermediate_dim = 512
batch_size = 128
latent_dim = 10
epochs = 1
num = 144

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

# use reparameterization trick to push the sampling out as input
# note that "output_shape" isn't necessary with the TensorFlow backend
z = Lambda(sampling, output_shape=(latent_dim,), name='z')([z_mean, z_log_var])

# instantiate encoder model
encoder = Model(inputs, [z_mean, z_log_var, z], name='encoder')
#encoder.summary()
plot_model(encoder, to_file='vae_mlp_encoder.png', show_shapes=True)

# build decoder model
latent_inputs = Input(shape=(latent_dim,), name='z_sampling')
x = Dense(intermediate_dim, activation='relu')(latent_inputs)
outputs = Dense(original_dim, activation='sigmoid')(x)

# instantiate decoder model
decoder = Model(latent_inputs, outputs, name='decoder')
#decoder.summary()
plot_model(decoder, to_file='vae_mlp_decoder.png', show_shapes=True)

# instantiate VAE model
outputs = decoder(encoder(inputs)[2])
vae = Model(inputs, outputs, name='vae_mlp')

vae.load_weights('vae_mlp_mnist.h5')


with open('result.json', 'r') as f:
    temp_latent = json.load(f)

temp_latent = np.array(list(temp_latent.values()))

temp_latent = np.array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])


v_1 = np.random.uniform((temp_latent[0]-(num/2)),(temp_latent[0]+(num/2)),num)
v_2 = np.random.uniform((temp_latent[1]-(num/2)),(temp_latent[1]+(num/2)),num)
v_3 = np.random.uniform((temp_latent[2]-(num/2)),(temp_latent[2]+(num/2)),num)
v_4 = np.random.uniform((temp_latent[3]-(num/2)),(temp_latent[3]+(num/2)),num)
v_5 = np.random.uniform((temp_latent[4]-(num/2)),(temp_latent[4]+(num/2)),num)
v_6 = np.random.uniform((temp_latent[5]-(num/2)),(temp_latent[5]+(num/2)),num)
v_7 = np.random.uniform((temp_latent[6]-(num/2)),(temp_latent[6]+(num/2)),num)
v_8 = np.random.uniform((temp_latent[7]-(num/2)),(temp_latent[7]+(num/2)),num)
v_9 = np.random.uniform((temp_latent[8]-(num/2)),(temp_latent[8]+(num/2)),num) 
v_10 = np.random.uniform((temp_latent[9]-(num/2)),(temp_latent[9]+(num/2)),num)  

l = np.array([v_1, v_2, v_3, v_4, v_5, v_6, v_7, v_8, v_9, v_10])
l = np.transpose(l)
print(l.shape)

images = np.array(decoder.predict(l))
images = np.reshape(images,(-1,28,28))

for i in range(images.shape[0]):
    matplotlib.image.imsave('data/generated_{}.png'.format(i), images[i,:,:], cmap='gray')

print(images.shape)
