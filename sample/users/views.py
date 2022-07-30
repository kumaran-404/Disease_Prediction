from email.policy import default
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from .models import CustomUser
from rest_framework.authentication import TokenAuthentication
from rest_framework import status
from django.db import IntegrityError
from django.core.files.storage import default_storage
import base64
from django.core.files.base import ContentFile
import json
from rest_framework.decorators import api_view
import os
import joblib

import numpy as np
import random




class User(APIView):
    permission_classes = [AllowAny, ]
    authentication_classes = [TokenAuthentication]

    def post(self, request):

        try:

            data = request.data
            print(data)
            username = data["username"]
            password = data["password"]
            email = data["email"]
            new_user = CustomUser.objects.create_user(
                username=username, password=password, email=email)
            new_user.save()
            return Response(data={"message": "success"}, status=status.HTTP_201_CREATED)
        except IntegrityError:
            return Response(data={"message": "failure", "error": "EMAIL_TAKEN"}, status=status.HTTP_200_OK)
        except KeyError:
            return Response(data={"message": "failure", "error": "some fields are not provided"}, status=status.HTTP_400_BAD_REQUEST)

        return Response(data={"message": "failure", "error": "internal server error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def ScrapeData(request):
    file = os.path.join(os.path.dirname(__file__), "ScrapData.json")
    return Response(data=json.load(open(file)))


@api_view(['POST'])
def predictData(request):
    # image_data = request.data['image']
    # format, imgstr = image_data.split(';base64,')
    # print("format", format)
    # ext = format.split('/')[-1]

    # data = ContentFile(base64.b64decode(imgstr))  
    # file_name = "myphoto." + ext
    # file_name = default_storage.save(file_name, data)
    # file_url = default_storage.path(file_name)

    # image_load = img1.load_img(file_url,target_size=(150,150))
    # numpy_array = img1.img_to_array(image_load)
    # image_batch = np.expand_dims(numpy_array , axis=0)
    # image_batch = np.vstack([image_batch])
    
    # index = np.argmax(val, axis=-1)
    val = x = random.randint(0,10)
    dictolist1 = ['bacterial_leaf_blight', 
                    'bacterial_leaf_streak',
                  'bacterial_panicle_blight',
                  'blast',
                  'brown_spot',
                  'dead_heart',
                  'downy_mildew',
                  'hispa',
                  'normal',
                  'tungro']
    links = ['http://www.knowledgebank.irri.org/decision-tools/rice-doctor/rice-doctor-fact-sheets/item/bacterial-blight',
    'http://www.knowledgebank.irri.org/training/fact-sheets/pest-management/diseases/item/bacterial-leaf-streak',
        'https://www.croplifela.org/en/diseases/bacterial-panicle-blight',
        'http://www.knowledgebank.irri.org/training/fact-sheets/pest-management/diseases/item/blast-leaf-collar',
        'http://www.knowledgebank.irri.org/training/fact-sheets/pest-management/diseases/item/brown-spot',
        'http://www.knowledgebank.irri.org/training/fact-sheets/pest-management/insects/item/stem-borer',
        'https://www.planetnatural.com/pest-problem-solver/plant-disease/downy-mildew/',
        'http://www.knowledgebank.irri.org/training/fact-sheets/pest-management/insects/item/rice-hispa',
        'https://www.masterclass.com/articles/how-to-grow-rice',
        'http://www.knowledgebank.irri.org/training/fact-sheets/pest-management/diseases/item/tungro']
    
    caption = [
        "Seedling wilt or kresek Water-soaked to yellowish stripes on leaf blades or starting at leaf tips then later increase in lengthand width with a wavy margin Appearance of bacterial ooze that looks like a milky or opaque dewdrop on young lesions early in the morning Lessions turn yellow to white as the disease advances If the cuts end of leaf is kept in water it becomes turbid because of bacterial ooze",
        "Bacterial leaf streak is caused by the bacterium Xanthomonas vasicola. The disease has been observed on field corn, seed corn, popcorn, and sweet corn. Symptoms of bacterial leaf streak are tan, brown, or orange lesions that occur between the veins of the corn leaves.",
        "Earliest known plant disease, Also known as rotten neck or rice fever. Reported from 80 rice-growing countries. First recorded in India during 1918. Expected grain loss : 70 to 80%",
        "Rice blast caused by fungus Magnaporthe oryzae, is generally considered the most important disease of rice worldwide because of its extensive distribution and destructiveness under favourable conditions",
        "Occur in nursery as well as main field Causes blight of seedlings Leaf spotting is very common Isolated brown, round to oval (resemble sesame seed) Spots measures 0.5 to 2.0mm in breadth - coalesce to form large patches.",
        "Presence of brown coloured egg mass near leaf tip. Caterpillar bore into central shoot of paddy seedling and tiller, causes drying of the central shoot known as “dead heart”",
        "Downy mildew is caused by the fungus Peronospora parasitica. Cabbage fields are infected through infected transplants or windblown spores anytime during the growing season. The symptoms include the development of a white and fluffy fungal growth on the undersides of the leaves, and on petioles and stems.",
        "Dicladispa armigera is a species of leaf beetle from Southeast Asia, often known by its common name: the rice hispa.",
        "No Disease detected", 
        "Plants affected by tungro exhibit stunting and reduced tillering. Their leaves become yellow or orange-yellow, may also have rust-colored spots. Discoloration begins from leaf tip and extends down to the blade or the lower leaf portion Delayed flowering, - panicles small and not completely exerted Most panicles sterile or partially filled grain"
    ]
    dis = dictolist1[val]
    lin = links[val]
    cap = caption[val]
    return Response(data={"disease": dis, "links": lin,"captions" : cap})
