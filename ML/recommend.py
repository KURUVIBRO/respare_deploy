import numpy as np
import tensorflow as tf
import pandas as pd
user_data=pd.read_csv('user_data.csv')
view_data=pd.read_csv('view_data.csv')
post_data=pd.read_csv('post_data.csv')
output=pd.merge(user_data,view_data,on='user_id',how='inner')
output=pd.merge(output,post_data,on='post_id',how='inner')
sum[]