// Import and register all your controllers from the importmap via controllers/**/*_controller
import { application } from "./application"

import ReactController from "./react_controller"
application.register("react", ReactController)