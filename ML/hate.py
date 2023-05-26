import numpy as np 
import pandas as pd 
import matplotlib.pyplot as plt
from wordcloud import WordCloud

from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder


import re
import nltk
nltk.download('stopwords')
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer
from sklearn.feature_extraction.text import CountVectorizer
import tensorflow as tf

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.naive_bayes import GaussianNB


from sklearn.metrics import confusion_matrix, accuracy_score
import os
tweets_df = pd.read_csv('https://cainvas-static.s3.amazonaws.com/media/user_data/cainvas-admin/twitter_labeled_data.csv')
tweets_df.head()
tweets_df = tweets_df.drop(['neither','Unnamed: 0','count','hate_speech','offensive_language'], axis= 1)
tweets_df.head()
tweets_df['length'] = tweets_df['tweet'].apply(len)
tweets_df.head()
tweets_df.describe()
offensive = tweets_df[tweets_df['class']==1]
offensive
neutral = tweets_df[tweets_df['class']==0]
sentences = offensive['tweet'].tolist()
len(sentences)
sentences_as_one_string = " ".join(sentences)
plt.figure(figsize=(20,20))
plt.imshow(WordCloud().generate(sentences_as_one_string))
sentences = neutral['tweet'].tolist()
len(sentences)
sentences_as_one_string = " ".join(sentences)
plt.figure(figsize=(20,20))
plt.imshow(WordCloud().generate(sentences_as_one_string))
import string
string.punctuation
def message_cleaning(message):
    Test_punc_removed = [char for char in message if char not in string.punctuation]
    Test_punc_removed_join = ''.join(Test_punc_removed)
    Test_punc_removed_join_clean = [word for word in Test_punc_removed_join.split() if word.lower() not in stopwords.words('english')]
    Test_punc_removed_join_clean_join = ' '.join(Test_punc_removed_join_clean)
    return Test_punc_removed_join_clean_join
tweets_df_clean = pd.DataFrame(columns=['class', 'tweet'])
tweets_df_clean['tweet'] = tweets_df['tweet'].apply(message_cleaning)
tweets_df_clean['class'] = tweets_df['class']
tweets_df_clean.head()
print(tweets_df_clean['tweet'][5])
print(tweets_df['tweet'][5]) 
from sklearn.feature_extraction.text import CountVectorizer

vectorizer = CountVectorizer(analyzer = message_cleaning)
tweets_countvectorizer = CountVectorizer(analyzer = message_cleaning, dtype = 'uint8').fit_transform(tweets_df_clean['tweet']).toarray()
tweets_countvectorizer.shape
X = tweets_countvectorizer
X
y = tweets_df_clean['class']
y = pd.get_dummies(y)
y = np.array(y)
y
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2,random_state=22)
total_words = 200
total_words
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Flatten,RepeatVector, Embedding, Input, LSTM, Conv1D, MaxPool1D, Bidirectional
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Embedding, Dense, GlobalAveragePooling1D
from tensorflow.keras.activations import linear, relu, sigmoid
from tensorflow.keras.losses import BinaryCrossentropy
print("Xtrain data: ",X_train[0])
print("Ytrain data: ",y_train[0][0])
model1 = Sequential(
    [               
        tf.keras.Input(shape=(63,)),    #specify input size
        ### START CODE HERE ### 
        Dense(units=25,activation='sigmoid'),
        Dense(units=15,activation='sigmoid'),
        Dense(units=1,activation='sigmoid')
        
        
        
        ### END CODE HERE ### 
    ], name = "my_model" 
)                            

model1.compile(loss = BinaryCrossentropy(from_logits=True), metrics=['acc'])
model1.summary()

history = model1.fit(X_train, y_train, batch_size = 256, validation_split = 0.1, epochs = 10)
model1.save("hate_speech.h5")
model1.evaluate(X_test,y_test)
