import json
from datetime import datetime

with open("dataset.json", "r", encoding="utf-8") as r:
    data = json.load(r)

edicoes = []
musicas = []

for edicao_key, edicao_data in data.items():
    edicao = {
        "_id": edicao_data["id"],
        "ano": int(edicao_data["anoEdição"]),
        "organizacao": edicao_data["organizacao"],
        "vencedor": edicao_data.get("vencedor", "")
    }
    
    edicoes.append(edicao)
    
    for musica in edicao_data["musicas"]:
        musica_doc = {
            "_id": musica["id"],
            "edicaoId": edicao_data["id"],
            "titulo": musica.get("título", ""),
            "pais": musica.get("país", ""),
            "link": musica.get("link", ""),
            "compositor": musica.get("compositor", ""),
            "interprete": musica.get("intérprete", ""),
            "letra": musica.get("letra", "")
        }
        
        musicas.append(musica_doc)

with open("edicoes.json", "w", encoding="utf-8") as w:
    json.dump(edicoes, w, ensure_ascii=False, indent=4)

with open("musicas.json", "w", encoding="utf-8") as w:
    json.dump(musicas, w, ensure_ascii=False, indent=4)
