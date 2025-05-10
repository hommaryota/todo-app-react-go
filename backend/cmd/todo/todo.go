package todo

import "net/http"

func Todo(mux *http.ServeMux){
	mux.HandleFunc("api/Todo",func(w http.ResponseWriter,r *http.Request){
		if r.Method != http.MethodGet {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}
	})
}