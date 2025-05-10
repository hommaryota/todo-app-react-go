package main

import (
	"net/http"
)

func middleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request){
		w.Header().Set("Access-Control-Allow-Origin","*")
		w.Header().Set("Access-Control-Allow-Methods","GET,POST,PUT,DELETE,OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type, Content-Length, Accept-Encoding, Authorization")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusNoContent)
			return
		}
		next.ServeHTTP(w,r)
	})
}

func main(){
	mux := http.NewServeMux()

	http.ListenAndServe(":8081",middleware(mux))
}