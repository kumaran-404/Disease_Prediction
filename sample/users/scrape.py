
import requests 
from bs4 import BeautifulSoup
import json



def FetchData():
	page = requests.get("https://economictimes.indiatimes.com/news/economy/agriculture?from=mdr")
	soup = BeautifulSoup(page.content,"html.parser")
	data =soup.select(".tabdata .eachStory")
	results = []
	for i in data:
		eachData = { 'title_' :"" , 'link': "" , 'content':"",'image':"", 
                        'postedAt':"" , 'content':""}
		link =i.select("h3 a")[0]
		eachData['title'] = link.get_text()
		eachData['link'] = "https://economictimes.indiatimes.com"+link['href']
		eachData['content'] = i.find("p").get_text()
		eachData['postedAt'] = i.find("time").get_text()	
		eachData['image'] = i.find(class_="imgContainer").select("img")[0]['data-original']
		results.append(eachData)

	with open("ScrapData.json","w") as ptr:
		json.dump(results,ptr,indent=2)


FetchData()
