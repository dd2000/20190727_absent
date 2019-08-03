# 1) Wyświetlić wszystkie dokumenty gdzie nazwa_portu równa się Warszawa

db.kontrole.find({nazwa_portu:"Warszawa"})

# 2) Wyświetl wszystkie dokumenty gdzie stopień strażnika jest szeregowy

db.kontrole.find({"straznik.stopien":"szeregowy"})

# 3) Wyświetl wszystkie dokumenty gdzie stopień strażnika jest szeregowiec i imię strażnika jest Jan
db.kontrole.find({$and:
                      [
                        {"straznik.stopien":"szeregowy"},
                        {"straznik.imie":"Jan"}
                      ]
                 })

# 4) Wyswietl wszystkie dokumenty gdzie stopień strażnika jest szeregowy lub kapitan
db.kontrole.find({$or:
                      [
                        {"straznik.stopien":"szeregowy"},
                        {"straznik.stopien":"kapitan"}
                      ]
                 })              

# 5) Wyświetl wszystkie dokumenty dla których czas kontroli jest większa od 5

db.kontrole.find({"czas_kontroli":{$gt:5}}).pretty()

# 6) Wyświetl dokumenty dla których czas kontroli jest większa od 5 i nazwa portu jest „Gdansk”.

db.kontrole.find({$and:[{"czas_kontroli":{$gt:5}},{"nazwa_portu":"Gdansk"}]}).pretty()

# 7) Dodać jedną kontrolę (dane obojętne) ale żeby miało taki sam schemat jak juz istniejace dokumenty
db.kontrole.insert({
		"nazwa_portu": "Singapur",
		"numer_stanowiska": "10",
		"wynik_kontroli": "true",
		"data_kontroli": new Date("2018-04-23T18:25:43.511Z"),
		"czas_kontroli" : 120,
		"ocena_kontroli" : 4,
		"straznik": {
			"imie": "Jhon",
			"nazwisko": "Smith",
			"stopien": "szeregowy"
		},
		"pasazer": {
			"imie": "Andy",
			"nazwisko": "Williams"
		}
})
db.kontrole.find().pretty()

# 8) Zmien wynik kontroli na false dla kontroli gdzie czas kontroli był większy od 5

db.kontrole.find({"czas_kontroli":{$gt:5}}).pretty()

db.kontrole.updateMany({"czas_kontroli":{$gt:5}}, {$set:{"wynik_kontroli":"false"}})
db.kontrole.find({"czas_kontroli":{$gt:5}}).pretty()

db.kontrole.find({"pasazer.imie":"Stanislaw"}, {"nazwa_portu":0} )
db.kontrole.createIndex({"pasazer.imie":1})
# 9) Oblicz jaka jest średnia ocena dla wszytkich kontroli z danego lotniska
db.kontrole.aggregate([{$group : {_id : "$nazwa_portu", total: {$avg : "$ocena_kontroli"}}}])

# 10) Oblicz sredni czas kontroli dla kazdego lotniska z wylaczeniem Warszawy

db.kontrole.find()

db.kontrole.aggregate([
                        {$match : {nazwa_portu : {$ne:"Warszawa"}}},
                        {$group : {_id : "$nazwa_portu", total: {$avg : "$czas_kontroli"}}}
                      ])

# 11) Wyświetlić wszystkie kontrole i posortować po "data"kontroli" rosnąco
                        
db.kontrole.find({}).sort({"data_kontroli":1})
                        
# 12) Wyświetlić wszystkie kontrole i posortować po nazwisku, imieniu pasażera 
                        
db.kontrole.find({}).sort({"pasazer.nazwisko":1,"pasazer.imie":1})



