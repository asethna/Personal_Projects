from lxml import html
import requests
import re
import sys
import xml.etree.cElementTree as ET

def main():    
    pattern = "[\d]*\n.*en's\n\$[\d]*"
    webpage = sys.argv[1]

    page = requests.get(webpage)
    tree = html.fromstring(page.content)
    allText = tree.xpath('//text()')

    parseHTML = ""

    for index in range(0, len(allText)):
        if "Reviews" in allText[index].encode('utf-8'):
            parseHTML += allText[index-1].encode('utf-8') + "\n"
        if "en's" in allText[index].encode('utf-8') or "$" in allText[index].encode('utf-8'):
            parseHTML += allText[index].encode('utf-8').replace(",","") + "\n"

    namePrice = re.findall(pattern, parseHTML)

    root = ET.Element("root")

    for i in namePrice: 
        product = i.split("\n")
        doc = ET.SubElement(root, "type", name=product[1])
        ET.SubElement(doc, "name", name="name").text = product[1]
        ET.SubElement(doc, "reviews", name="reviews").text = product[0]
        ET.SubElement(doc, "price", name="price").text = product[2]
    
    tree = ET.ElementTree(root)
    tree.write("data.xml")
    
if __name__ == "__main__":
    main()
