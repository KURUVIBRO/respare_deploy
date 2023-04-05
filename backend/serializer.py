from unittest.util import _MAX_LENGTH
from rest_framework import serializers

from backend.models import Choice,Comment,Topic
class ChoiceIdSerializer(serializers.Serializer):
    id=serializers.IntegerField()

class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model=Choice
        fields=['id','option','count']

class CommentSerailizer(serializers.ModelSerializer):
    class Meta:
        model=Comment
        fields=['id','user','topic','body']

class NewCommentSerailizer(serializers.ModelSerializer):
    class Meta:
        model=Comment
        fields=['body']

class ProfileSerializer(serializers.Serializer):
    uname=serializers.CharField(max_length=30)

class TopicIdSerializer(serializers.Serializer):
    id=serializers.IntegerField()

class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model=Topic
        fields=['id','title','description','wide_image']

#class CommentSerializer(serializers.ModelSerializer):
 #   class Meta:
  #      model=Comment