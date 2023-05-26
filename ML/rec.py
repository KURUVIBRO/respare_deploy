import pandas as pd
import numpy as np
import re
post_data = pd.read_csv(r'post_data.csv')
user_data = pd.read_csv(r'user_data.csv')
view_data = pd.read_csv(r'view_data.csv')
print(post_data.head())
dataframe = pd.DataFrame(view_data)
dataframe["Valuable"] = np.random.randint(1, 6, len(dataframe))
df = pd.merge(dataframe, post_data ,on='post_id')
df.tail()
data = df.drop(['time_stamp', 'category'], axis=1)
combine_post_rating = data.dropna(axis = 0, subset = ['title'])

post_ratingCount = (combine_post_rating.
     groupby(by = ['title'])['Valuable'].
     count().
     reset_index().
     rename(columns = {'Valuable': 'totalValuableCount'})
     [['title', 'totalValuableCount']]
    )
post_ratingCount.head()
rating_with_totalValuableCount = combine_post_rating.merge(post_ratingCount, left_on = 'title', right_on = 'title', how = 'left')
rating_with_totalValuableCount.tail()
pd.set_option('display.float_format', lambda x: '%.3f' % x)
print(post_ratingCount['totalValuableCount'].describe())
print(post_ratingCount['totalValuableCount'].quantile(np.arange(.9, 1, .01)))
popularity_threshold = 13
rating_popular_post = rating_with_totalValuableCount.query('totalValuableCount >= @popularity_threshold')
rating_popular_post.tail()
len(user_data.city.unique())
from scipy.sparse import csr_matrix
rating_popular_post = rating_popular_post.drop_duplicates(['user_id', 'title'])
rating_popular_post_pivot = rating_popular_post.pivot(index = 'title', columns = 'user_id', values = 'Valuable').fillna(0)
rating_popular_post_matrix = csr_matrix(rating_popular_post_pivot.values)

from sklearn.neighbors import NearestNeighbors


model_knn = NearestNeighbors(metric = 'cosine', algorithm = 'brute')
model_knn.fit(rating_popular_post_matrix)
rating_popular_post_pivot.shape[0]
query_index = np.random.choice(rating_popular_post_pivot.shape[0])
print("Query Index: ",query_index)
distances, indices = model_knn.kneighbors(rating_popular_post_pivot.iloc[query_index,:].values.reshape(1, -1), n_neighbors = 6)
rating_popular_post_pivot.index[query_index]
for i in range(0, len(distances.flatten())):
    if i == 0:
        print('Recommendations for {0}:\n'.format(rating_popular_post_pivot.index[query_index]))
    else:
        print('{0}: {1}, with distance of {2}:'.format(i, rating_popular_post_pivot.index[indices.flatten()[i]], distances.flatten()[i]))
