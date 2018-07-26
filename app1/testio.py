import asyncio
import datetime

import os




# Début du code
mots = open("mots.txt", "r")
contenu = mots.read()
contenu = contenu.split(',')
print(contenu)
mots.close()
mots= open("mots.txt", "a")
mots.write(",youssef") 
mots.close()
mots = open("mots.txt", "r")
contenu = mots.read()
print(contenu)
contenu = contenu.split(',')
print(contenu)