import json
import sys
import csv
import random
import uuid


target_csv = './data/got_scripts_breakdown.csv'
output_json= './output/got_msg.json'
conversation_id_size = 6
characters = ['jon','tyrion','daenerys','cersei']
conversation_types = ['chat', 'transcript', 'feedback', 'email']


def generate_chat(character, msg):

  new_id = chats[character]['cID'] + 1
  chats[character]['cID'] = new_id

  #randomize if moving forward with date and how much
  if (random.gauss(0 , 0.1) > 0.1):
    new_conversation_id = str.upper(uuid.uuid4().hex[:conversation_id_size])
    new_time = chats[character]['cTime'] + abs(random.gauss(0, 2))*1130000000
    new_conversation_type = random.choice(conversation_types)

    chats[character][str(new_id)] = {
      'conversationId': new_conversation_id,
      'time': new_time,
      'type': new_conversation_type,
      'msg': msg
    }

    chats[character]['cConversationID'] = new_conversation_id
    chats[character]['cTime'] = new_time
    chats[character]['cConversationType'] = new_conversation_type

  else:
    chats[character][str(new_id)] = {
      'conversationId': chats[character]['cConversationID'],
      'time': chats[character]['cTime'],
      'type': chats[character]['cConversationType'],
      'msg': msg
    }





if (len(sys.argv) > 1):
  target_csv = sys.argv[1]

chats = {}
for character in characters:

  chats[character] = {
    'cID': 0,
    'cTime': 1262296800000,
    'cConversationID': str.upper(uuid.uuid4().hex[:conversation_id_size]),
    'cConversationType': random.choice(conversation_types)
  }

with open(target_csv, newline='') as csvfile:
  chatreader = csv.reader(csvfile, delimiter=';')
  for row in chatreader:
    if (row[4] in characters):
      generate_chat(row[4], row[3])
      #print(', '.join(row))

with open(output_json, 'w') as outfile:
  json.dump(chats, outfile, indent=4)
print(json.dumps(chats, indent=4))
