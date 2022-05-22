package main

import (
	"log"
	"net/http"
	"mini-olx-backend/database"
	"mini-olx-backend/handlers"
	"os"

	"github.com/gorilla/mux"
	_ "github.com/joho/godotenv/autoload"
	"github.com/rs/cors"

)


func main() {
    database.CreateConn()
    
    router := mux.NewRouter()
    router.HandleFunc("/api/ads", handlers.List).Methods(http.MethodGet)
    router.HandleFunc("/api/ads", handlers.List).Methods(http.MethodPost)
    router.HandleFunc("/api/ads/:id", handlers.List).Methods(http.MethodDelete)

    router.
        PathPrefix("/static/").
        Handler(http.StripPrefix("/static", http.FileServer(http.Dir("./static/"))))
    
   allowedMethods := []string{
       http.MethodGet,
       http.MethodPost,
       http.MethodDelete,
       http.MethodPatch,
       http.MethodOptions,
   }

   handler := cors.
       New(cors.Options{AllowedMethods: allowedMethods}).
       Handler(router)

   err := http.ListenAndServe(":"+os.Getenv("PORT"), handler)
	if err != nil {
        log.Fatal(err)
    }  
}