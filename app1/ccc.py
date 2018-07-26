
import asyncio
import datetime
import random
import websockets
from bs4 import BeautifulSoup
import requests
import re
import urllib
import urllib.request
import os
import json
import django
#from app1.models import Memoire
import matplotlib.pyplot as plt
import tensorflow as tf
import numpy as np
import base64

# Functions and classes for loading and using the Inception model.
try:
    from http.cookiejar import CookieJar
except ImportError:
    from cookielib import CookieJar

def get_soup(url,header):
    return BeautifulSoup(urllib.request.urlopen(urllib.request.Request(url,headers=header)),'html.parser')

def downloader(image_url,query,count):
    
    full_file_name = query+str(count) +'.jpg'
    urllib.request.urlretrieve(image_url,full_file_name)
    
def Appliquer_inception(image_path):
	inception.maybe_download()
	model = inception.Inception()
	resized_image = model.get_resized_image(image_path=image_path)
	classify(image_path="images/Velo9.jpg")
	
    
def aspiration(query):
    
    # On change la query si nécessaire
    prevdir = os.getcwd()
    image_type="ActiOn"
    query= query.split()
    query='+'.join(query)
    url="https://www.google.co.in/search?q="+query+"&source=lnms&tbm=isch"
    #le chemin pour les images
    DIR="Pictures"
    header={'User-Agent':"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.134 Safari/537.36"
    }
    soup = get_soup(url,header)


    ActualImages=[]
    for a in soup.find_all("div",{"class":"rg_meta"}):
        link , Type =json.loads(a.text)["ou"]  ,json.loads(a.text)["ity"]
        ActualImages.append((link,Type))

    print ("there are total "+str(len(ActualImages))+ " images")

    if not os.path.exists(DIR):
            os.mkdir(DIR)
    DIR = os.path.join(DIR, query.split()[0])

    if not os.path.exists(DIR):
            os.mkdir(DIR)
        
    directory = os.getcwd()+"/"+DIR
    os.chdir(directory)
        
    # Récupération des image de "ActualImages" dans "C:/......./Pcitures/Query"
    count=0
    for i , (img , Type) in enumerate( ActualImages):
        try:
            count = count+1
            downloader(img,query,count)
        
        except Exception as e:
            count = count-1
            pass

    nbImages = count
    os.chdir(prevdir)
    return directory



#import cv2 as cv
import os
import numpy as np
#from scipy import ndimage
import csv
##from scipy.stats import kurtosis
#from scipy.stats import skew
from math import log
#from skimage import feature

# Fonction pour extraire les features
# Paramètres: 
# query, String le mot à chercher
#Test, String pour l'enregistrement du .csv s'il s'agit d'un test exrtérieur
# Retourne un tableau des features stocké dans une variable d (liste de listes)
# enregistré au préalable au format .csv

def extraction_features(query,Test):
    if Test == 'Test':
        prevdir = direc +"\Test"+"\\"+query+"\\"+'b'
    else:
        prevdir = direc +"\Pictures"+"\\"+query+"\\"+'b'

    #print(prevdir)
    pdir = prevdir[0:len(prevdir)-1]
    #print(pdir)
    tmp = prevdir[0:len(prevdir)-2]
    #print("tmp : "+tmp)

    count = 0
    nbErr = 0
    os.chdir(tmp)

    d = []
    header = ['id', 'Min', 'Max', 'Mean', 'Geom.mean', 'Sum', 'Squares', 'Std Dev', 'Variance', 'Skewness', 'kurtosis',
             'Mean(Min)', 'Mean(Max)', 'Mean(Mean)', 'Mean(Geom.mean)', 'Mean(Sum)', 'Mean(Squares)', 'Mean(Std Dev)',
             'Mean(Variance)', 'Mean(Skewness)', 'Mean(kurtosis)','label']

    d.append(header)

    acc_min = 0
    acc_max = 0
    acc_mean = 0
    acc_gm = 0
    acc_sum = 0
    acc_squ = 0
    acc_std = 0
    acc_var = 0
    acc_skew = 0
    acc_kurtosis = 0
    DirNorm = 'Normalized'
    DirVar = 'Filtred'

            
    for path, dirs, files in os.walk(os.getcwd()):
        for filename in files: 
            try:
                if not os.path.exists(DirNorm):
                    os.mkdir(DirNorm)
            
                if not os.path.exists(DirVar):
                    os.mkdir(DirVar)
                # Double traitement
                #print(filename)
                #print(path)
                #print(pdir+filename)
                img = cv.imread(pdir+filename)
                img = cv.resize(img, (200, 200))
                normalizedImg = np.zeros((200, 200))
                normalizedImg = cv.normalize(img,  normalizedImg, 0, 255, cv.NORM_MINMAX)
                cv.imwrite(DirNorm+'/P'+filename,normalizedImg)
                img2 = cv.imread(DirNorm+'/P'+filename)

                
                edges = cv.Canny(img2,15,15)
                cv.imwrite(DirVar+'/F'+filename,edges)
                # Prise des features
                #imgp = cv.imread(DirVar+'/F'+filename)
                imgf = np.ndarray.flatten(edges)
                minimum = np.ndarray.min(imgf)
                maximum = np.ndarray.max(imgf)
                mean = np.ndarray.mean(imgf)

                if minimum == 0:
                    gm = 0
                else:
                    logimg = [log(y,10) for y in imgf]
                    gm1 = np.mean(logimg)
                    gm = 10**(gm1)
                
                summ = np.sum(imgf)
                ssum = summ**2
                std = np.std(imgf)
                var = np.var(imgf)
                sk = skew(imgf)
                ku  = kurtosis(imgf)
            
                #mise à jour compteur
                count = count+1

                # Mise a jour accumulateurs
                acc_min += minimum
                acc_max += maximum
                acc_mean += mean
                acc_gm += gm
                acc_sum += summ
                acc_squ += ssum
                acc_std += std
                acc_var += var
                acc_skew += sk
                acc_kurtosis += ku
            
                #Aggretation cumulative
                ac_min = acc_min/count
                ac_max = acc_max/count
                ac_mean = acc_mean/count
                ac_gm = acc_gm/count
                ac_sum = acc_sum/count
                ac_squ = acc_squ/count
                ac_std = acc_std/count
                ac_var = acc_var/count
                ac_skew = acc_skew/count
                ac_kurtosis = acc_kurtosis/count
            

                row = [filename,minimum,maximum,mean,gm,summ,ssum,std,var,sk,ku,ac_min,ac_max,ac_mean,ac_gm,ac_sum,
                   ac_squ,ac_std,ac_var,ac_skew,ac_kurtosis,query]
                d.append(row)

            except Exception as e:
                count = count-1
                nbErr = nbErr +1
                #os.remove('./P'+filename)
                pass
    
    os.chdir(direc)

    if Test == 'Test':
        ecrire('features'+query+Test,d,direc)
    else:
        ecrire('features'+query,d,direc)                
    return d,pdir,nbErr


#### Pandas is used for data manipulation
import pandas as pd
import numpy as np
#from sklearn.cluster import KMeans

def filtrage_cluster(query,data,pdir):
    
    # Read in data and display first 5 rows
    features = pd.read_csv(direc+'\\csv\\features'+query+'.csv')
    features.describe()
    f2 = features
    labels = np.array(features['label'])
    features= features.drop('label', axis = 1)
    features= features.drop('id', axis = 1)

    features.head(3)
    feature_list = list(features.columns)

    # Orange

    kmeans = KMeans(n_clusters=2, random_state=0).fit(features)
    clu = kmeans.labels_
    taille = len(kmeans.labels_)
    nb0 = 0
    nb1 = 0
    nb2 = 0
    # Chercher le bon cluster
    ##################for i in range(taille):
    #################    if clu[i]== 0:
    ################        nb0 +=1
     ###############   if clu[i]== 1:
     ##############       nb1 +=1
     #############   if clu[i]== 2:
     ############       nb2 +=1
    ###########liste_len =  [nb0, nb1, nb2]
    ##########print(liste_len)
   ######### liste = [0 , 1 , 2]
   ####### mx= max(liste_len)
   ### indx = liste_len.index(mx)
   # print(mx)
    ####print(indx)
   ## cluster = liste[indx]
    #print(cluster)

    
    
    if sum(kmeans.labels_) > int(taille/2):
        cluster = 1
    else:
        cluster=0
    
    header = ['id', 'Min', 'Max', 'Mean', 'Geom.mean', 'Sum', 'Squares', 'Std Dev', 'Variance', 'Skewness', 'kurtosis',
             'Mean(Min)', 'Mean(Max)', 'Mean(Mean)', 'Mean(Geom.mean)', 'Mean(Sum)', 'Mean(Squares)', 'Mean(Std Dev)',
             'Mean(Variance)', 'Mean(Skewness)', 'Mean(kurtosis)','label']
        
    data_clu = [header]
    prev = os.getcwd()
    os.chdir(pdir)
    #print(os.getcwd())
    if not os.path.exists('Cluster'):
        os.mkdir('Cluster')
    os.chdir(prev)
    for i in range(taille):
        if clu[i]== cluster:
            data_clu.append(data[i+1])
            file_tmp = data[i+1][0]
            #print(data[i+1][0])
            #print(pdir+file_tmp)
            img = cv.imread(pdir+file_tmp)
            cv.imwrite(pdir+"Cluster/"+file_tmp,img)
            
    ecrire('Final_features'+query,data_clu,direc)

    
    return data_clu

def partitionner(data):
    # Premier élément est : "header"
    taille = len(data)
    tailleApp = int(0.7*(taille-1))
    data_app = data[1:tailleApp+1]
    data_test = data[tailleApp+1:]
    
    return data_app,data_test

def fusionner(Data,header):
    App = [header]
    for data in Data:
        App = App + data
    return App



def fusionner2(Data,header):
    App = [header]
    for data in Data:
        App = App + data[1:]
    return App

# Apprentissage
import pandas as pd
import numpy as np
# from sklearn.ensemble import RandomForestClassifier

## Données Apprentissage
def Load():
    
    featuresApp = pd.read_csv(direc+'\csv\Apprentissage.csv')
    featuresApp.describe()
    labelsApp = np.array(featuresApp['label'])
    featuresApp = featuresApp.drop('label', axis = 1)
    featuresApp= featuresApp.drop('id', axis = 1)

    featuresApp.head(3)
    feature_list_App = list(featuresApp.columns)

    ## Données test
    featuresTest = pd.read_csv(direc+'\\csv\\Test.csv')
    featuresTest.describe()
    labelsTest = np.array(featuresTest['label'])
    featuresTest = featuresTest.drop('label', axis = 1)
    featuresTest = featuresTest.drop('id', axis = 1)

    feature_list_Test = list(featuresTest.columns)
    print('Training Features Shape:', featuresApp.shape)
    print('Training Labels Shape:', labelsApp.shape)
    print('Testing Features Shape:', featuresTest.shape)
    print('Testing Labels Shape:', labelsTest.shape)
    
    return featuresApp,labelsApp,featuresTest,labelsTest

# from sklearn.metrics import confusion_matrix
import random

def LancerAlgo(Queries,rf,aspi):
    header = ['id', 'Min', 'Max', 'Mean', 'Geom.mean', 'Sum', 'Squares', 'Std Dev', 'Variance', 'Skewness', 'kurtosis',
             'Mean(Min)', 'Mean(Max)', 'Mean(Mean)', 'Mean(Geom.mean)', 'Mean(Sum)', 'Mean(Squares)', 'Mean(Std Dev)',
             'Mean(Variance)', 'Mean(Skewness)', 'Mean(kurtosis)','label']
    Lbl = []
    Data = []
    for query in Queries:
        if aspi:
            directory = aspiration(query)
            print("Aspiration Réussie")
            
        query= query.split()
        query='+'.join(query)
        Lbl.append(query)
        #print("********* Fin aspiration ***************")
        data,chemin,nbErr = extraction_features(query,'Not')
        #print("********* Fin extraction features ***************")
        dataCluster = filtrage_cluster(query,data,chemin)
        #print("********* Fin clustering ***************")
        Data.append(dataCluster)
    
    DataA = []
    DataT = []
    for data in Data:
        data_app,data_test = partitionner(data)
        DataA.append(data_app)
        DataT.append(data_test)


    dataApp = fusionner(DataA,header)
    dataTest = fusionner(DataT,header)
    
    dataApp2 = dataApp[1:]
    dataTest2 = dataTest[1:]

    random.shuffle(dataTest2)
    random.shuffle(dataApp2)
    dataAf = [dataApp[0]] + dataApp2
    dataTf = [dataTest[0]] + dataTest2
    ecrire('Apprentissage', dataAf,direc)
    ecrire('Test',dataTf,direc)
    featuresApp,labelsApp,featuresTest,labelsTest = Load()
    # Train the model on training data
    rf.fit(featuresApp, labelsApp);
    predictions = rf.predict(featuresTest)
    score = rf.score(featuresTest,labelsTest)
    #print(predictions)
    ##print(labelsTest)


    Mat = confusion_matrix(labelsTest, predictions, labels=Lbl)
    return Mat,score

# from sklearn.metrics import confusion_matrix
import random

# Test extérieur
def TestIndep(Queries,rf):
    header = ['id', 'Min', 'Max', 'Mean', 'Geom.mean', 'Sum', 'Squares', 'Std Dev', 'Variance', 'Skewness', 'kurtosis',
             'Mean(Min)', 'Mean(Max)', 'Mean(Mean)', 'Mean(Geom.mean)', 'Mean(Sum)', 'Mean(Squares)', 'Mean(Std Dev)',
             'Mean(Variance)', 'Mean(Skewness)', 'Mean(kurtosis)','label']
    directories = []
    Lbl = []
    Dat = []
    for query in Queries:
        query= query.split()
        query='+'.join(query)
        Lbl.append(query)
        directories.append(direc +"\\Test"+"\\"+query+"\b")
        dataTest,c,nbErr = extraction_features(query,'Test')
        Dat.append(dataTest)
        
    Test_Final = fusionner2(Dat,header)
    ecrire('TestExt',Test_Final,direc)
            
    ## Données test
    featuresTest2 = pd.read_csv(direc+'\\csv\\TestExt.csv')
    labelsTest2 = np.array(featuresTest2['label'])
    featuresTest2 = featuresTest2.drop('label', axis = 1)
    featuresTest2 = featuresTest2.drop('id', axis = 1)

    featuresTest2.head(3)
    feature_list_Test2 = list(featuresTest2.columns)
    #print(feature_list_Test2)
    #print(len(featuresTest2))
    #p#rint(featuresTest2)
    predictions2 = rf.predict(featuresTest2)
    ##print(predictions2)
    ###print(labelsTest2)
    score = rf.score(featuresTest2,labelsTest2)
    Mat = confusion_matrix(labelsTest2, predictions2, labels=Lbl)
    
    return Mat,score




async def apprendre(websocket, path):

    while True:

        name = await websocket.recv()

        data = json.loads(name)
        action = data["action"]
        print("action : "+action)
        if action == "apprendre" :

            query = data["keyword"]
            print(Queries)
            Queries.append(query)
            print(Queries)
            #Mat,sc= LancerAlgo(Queries,rf,1)
            retour = "apprentissage_terminé"
            #print("score : "+str(sc))
            mots = open("mots.txt", "a")
            mots.write(query+"\n") 
            mots.close()
            mots = open("mots.txt", "r")
            contenu = mots.read()
            print(contenu)
            #models.Memoire.objects.create(mot=query, url = "C://Pictures")

        elif action == "recevoirPseudo":
            retour = "[Banane, Orange]"

        elif action == "recevoirImage":

            image = data["image"]
            print(type(image))
            image = image.encode()
            print(type(image))
            image = base64.decodestring(image)
            print(type(image))
            with open('out.jpg', 'wb') as out_file:
                out_file.write(image)
            print(type(image))

            print(type(image))

            L = classify(image_path="out.jpg")
            print(type(image))
            retour = "image_reconnue/"+L[0]



        print(retour)   
        await websocket.send(retour)




def ecrire(nomFichier,d,direc):
    with open(direc+"\\"+'csv'+"\\"+nomFichier+'.csv','w') as csvfile:
        wr = csv.writer(csvfile, delimiter=',', quotechar='|', quoting=csv.QUOTE_MINIMAL)
        for row in d:
            wr.writerow(row)

 ################ INCEPTION ################################################
def classify(image_path):
    # Display the image.

    # Use the Inception model to classify the image.
    pred = model.classify(image_path=image_path)

    # Print the scores and names for the top-10 predictions.
    L = model.print_scores(pred=pred, k=5, only_first_name=True)  
    return L
def plot_resized_image(image_path):
    # Get the resized image from the Inception model.
    resized_image = model.get_resized_image(image_path=image_path)

    # Plot the image.
    plt.imshow(resized_image, interpolation='nearest')
    
    # Ensure that the plot is shown.
    plt.show()

print("aa")
import inception
print("aa")

inception.maybe_download()
model = inception.Inception()
direc = os.getcwd()
print(direc)
if not os.path.exists('csv'):
    os.mkdir('csv')
        

# Récupérer les mots
# rf = RandomForestClassifier()
Queries = []
start_server = websockets.serve(apprendre, '127.0.0.1', 8025)
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
