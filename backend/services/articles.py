import json
import os

class ArticleService:

    def get_article_path():
        base_path = os.path.dirname(__file__)
        return os.path.join(base_path, "articles.json")
    def readDb():
        file_path = ArticleService.get_article_path()

        if os.path.exists(file_path):
            with open(file_path, "r") as f:
                return json.load(f)
        else:
            return {"articles":[]}

    def writeDb(data):
        file_path = ArticleService.get_article_path()
        with open(file_path, "w") as f:
            json.dump(data, f, indent=4)
        
    # def editDb(data):
    #     file_path = ArticleService.get_article_path()

