import { Controller } from "@hotwired/stimulus";
import React from "react";
import ReactDOM from "react-dom/client";

import Map from "../components/map_component";
import InputGroup from "../components/input_group_component";
import PlacesList from "../components/places_list_component";

import { MapContextProvider } from "../context/map_context";

const modules = { Map, PlacesList, InputGroup };

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
