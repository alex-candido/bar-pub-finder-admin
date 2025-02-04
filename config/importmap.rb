# Pin npm packages by running ./bin/importmap

pin "application"
pin "@hotwired/turbo-rails", to: "turbo.min.js"
pin "@hotwired/stimulus", to: "stimulus.min.js"
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js"
pin_all_from "app/javascript/controllers", under: "controllers"
pin_all_from "app/javascript/components", under: "components"
pin "preline", to: "https://cdn.jsdelivr.net/npm/preline@2.7.0/index.js" # 2.7.0
pin "leaflet", to: "https://ga.jspm.io/npm:leaflet@1.9.4/dist/leaflet-src.js" # @1.9.4
pin "leaflet-providers", to: "https://ga.jspm.io/npm:leaflet-providers@2.0.0/leaflet-providers.js" # @2.0.0
pin "leaflet.markercluster", to: "https://ga.jspm.io/npm:leaflet.markercluster@1.5.3/dist/leaflet.markercluster-src.js" # @1.5.3
pin "react" # @19.0.0
pin "process" # @2.1.0
pin "react-dom" # @19.0.0
pin "scheduler" # @0.25.0
