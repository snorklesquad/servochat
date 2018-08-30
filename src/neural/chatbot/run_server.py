from __future__ import print_function
from prep_data import *

import tensorflow as tf
from keras.callbacks import LambdaCallback
from keras.models import Model, Sequential, load_model
from keras.layers import Dense, Activation, Dropout
from keras.layers import LSTM
from keras.optimizers import RMSprop
from keras.utils.data_utils import get_file

import flask
import io

global graph

g = tf.Graph()

app = flask.Flask(__name__)

with g.as_default():
    print('Loading model...')
    model = load_model('./models/red_brain.h5')

@app.route("/predict", methods=["POST"])
def predict():
    data = {"success": False}
    if flask.request.method == "POST":
        start_index = random.randint(0, len(text) - maxlen - 1)
        generated = ''
        sentence = text[start_index: start_index + maxlen - len(flask.request.get_json(force=True)) ] + flask.request.get_json(force=True)
        generated += sentence
        for i in range(64):

            x_pred = np.zeros((1, maxlen, len(chars)))
            for t, char in enumerate(sentence):
                x_pred[0, t, char_indices[char]] = 1.
            with g.as_default():
                preds = model.predict(x_pred, verbose=0)[0]
            next_index = sample(preds, 0.2)
            next_char = indices_char[next_index]

            generated += next_char
            sentence = sentence[1:] + next_char
            data["predictions"] = generated
            data["success"] = True

        return flask.jsonify(data)
