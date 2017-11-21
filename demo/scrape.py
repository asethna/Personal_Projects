from lxml import html
import requests
import re
import sys
import json

def main():
    print sys.argv[0]
    
    pattern = ".*en's\n\$[\d]*.\d\d"
    webpage = sys.argv[1]

    page = requests.get(webpage)
    tree = html.fromstring(page.content)
    allText = tree.xpath('//text()')

    parseHTML = ""

    for item in allText:
        if "en's" in item.encode('utf-8') or "$" in item.encode('utf-8'):
            parseHTML += item.encode('utf-8') + "\n"

    namePrice = re.findall(pattern, parseHTML)

    with open('data.txt', 'w') as outfile:
        json.dump(namePrice, outfile)

if __name__ == "__main__":
    main()
