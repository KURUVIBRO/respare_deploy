import joblib
from sklearn. tree import DecisionTreeClassifier
from sklearn. feature_extraction. text import CountVectorizer
cv = joblib.load('cv.joblib')
input="I hate Gay people"
model = joblib.load('my_model.joblib')
print(model)
#cv=pickle.load(open("vectorizer.pickle", 'rb'))
#print(type(cv)) 
inp= cv.transform([input]).toarray()
print(model.predict(inp))