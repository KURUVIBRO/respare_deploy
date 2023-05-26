from tensorflow.keras.models import load_model
from sklearn.feature_extraction.text import CountVectorizer
import numpy as np 
import pandas as pd 
import string
from nltk.corpus import stopwords
def message_cleaning(message):
    Test_punc_removed = [char for char in message if char not in string.punctuation]
    Test_punc_removed_join = ''.join(Test_punc_removed)
    Test_punc_removed_join_clean = [word for word in Test_punc_removed_join.split() if word.lower() not in stopwords.words('english')]
    Test_punc_removed_join_clean_join = ' '.join(Test_punc_removed_join_clean)
    return Test_punc_removed_join_clean_join
model1 = load_model('hate_speech.h5')
tweets_df = pd.read_csv('twitter_labeled_data.csv')
print(tweets_df['tweet'][:5])
print(type(tweets_df['tweet'][:5]))
tweets_countvectorizer = CountVectorizer(analyzer = message_cleaning, dtype = 'uint8').fit_transform(tweets_df['tweet'][16:19]).toarray()
preds = model1.predict(tweets_countvectorizer)
preds_class = []
for i in range(len(preds)):
    preds_class.append(np.argmax(preds[i]))
preds_class = np.array(preds_class) 
print("pred:",preds_class)
df = pd.DataFrame(columns=['Predicted Labels', 'Actual Labels'])
df['Predicted Labels'] = preds_class
df['Actual Labels'] = tweets_df['class'][:5]
df.head()
print(df.head())