import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import json


def convertCustomer(orig, id):
  return {
    "id": id,
    "firstName": orig['firstName'],
    "lastName": orig['lastName'],
    "rating": orig['rating'],
    "img": orig['img'],
    "email": orig['email'],
    "phone": orig['phone'],
    "numOfChats": len(orig['chats']),
    "numOfFeedback": len(orig['feedback']),
    "personalTraits": orig['personalTraits'],
    "ai": orig['ai'],
    "charts": orig['charts']
  }


def convertChat(orig, id):
  return {
    "id": id,
    "conversationId": orig['conversationId'],
    "time": orig['time'],
    "operatorId": orig['operatorId'],
    "content": orig['content']
  }


def convertFeedback(orig, id):
  return {
    "id": id,
    "feedbackId": orig['feedbackId'],
    "rating": orig['rating'],
    "time": orig['time'],
    "content": {
      "msg": orig['content']['msg']
    }
  }


cred = credentials.Certificate('./feedback-frontend-1447b-ab7db3dc025f.json')
firebase_admin.initialize_app(cred)

db = firestore.client()

with open('./mockDB.json') as f:
  d = json.load(f)
  for customerID in d['customers']:

    customer = convertCustomer(d['customers'][customerID], customerID)

    db.collection('customers').document(customerID).set(customer)

    for chatID in d['customers'][customerID]['chats']:
      chat = convertChat(d['customers'][customerID]['chats'][chatID], chatID)
      db.collection('customers').document(customerID).collection('chats').document(chatID).set(chat)

    for feedbackID in d['customers'][customerID]['feedback']:
      feedback = convertFeedback(d['customers'][customerID]['feedback'][feedbackID], feedbackID)
      db.collection('customers').document(customerID).collection('feedback').document(feedbackID).set(feedback)
