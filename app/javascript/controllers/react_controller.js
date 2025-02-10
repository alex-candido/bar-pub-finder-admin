import { Controller } from "@hotwired/stimulus";
import React from "react";
import ReactDOM from "react-dom/client";

import MapView from "../components/map_view_component";
import InputSearch from "../components/input_search_component";
import PlacesList from "../components/places_list_component";
import Sidebar from "../components/sidebar_component";
import AutoComplete from "../components/auto_complete_component"

import { MapContextProvider } from "../context/map_context";

const modules = { MapView, PlacesList, InputSearch, Sidebar, AutoComplete };

export default class extends Controller {
  static values = {
    component: String,
    props: Object,
  };

  connect() {
    const module = modules[this.componentValue];
    if (module) {
      this.root = ReactDOM.createRoot(this.element);
      this.root.render(
        React.createElement(MapContextProvider, {}, 
          React.createElement(module, {
            ...this.propsValue
          })
        )
      );
    } else {
      console.error(`Could not find module ${this.componentValue}`);
    }
  }

  disconnect() {
    if (this.root) {
      this.root.unmount();
      this.root = null; 
    }
  }
}
