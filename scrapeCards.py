import requests
import sys
from bs4 import BeautifulSoup


def main(setTag):
    a = "https://aetherhub.com/Apps/LimitedRatings/{0}".format(setTag)
    page = requests.get(a)
    soup = BeautifulSoup(page.text, 'html.parser')

    draftValues = {}
    dv = "{"

    aTags = soup.find_all('a', class_="cardLink")
    for i in range(len(aTags)):
        draftValues[aTags[i]['data-name']] = aTags[i]['data-rating'].split(' ')[0]
        dv += aTags[i]['data-name']
        dv += ": "
        dv += aTags[i]['data-rating'].split(' ')[0]
        if i != len(aTags)-1:
            dv += ", "
    dv += "}"

    print(dv)

    RatingFile = open("{0}-ratings".format(setTag), "w")
    RatingFile.write(dv)
    RatingFile.close()

    # print(draftValues)
            
if __name__ == "__main__":
    main(sys.argv[1])
