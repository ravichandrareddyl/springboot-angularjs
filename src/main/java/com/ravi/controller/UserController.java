package com.ravi.controller;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class UserController {
	
	

		@RequestMapping("/user")
		@ResponseBody
		public Principal user(Principal user) {
			return user;
		}

		@RequestMapping("/resource")
		@ResponseBody
		public Map<String, Object> home() {
			Map<String, Object> model = new HashMap<String, Object>();
			model.put("id", UUID.randomUUID().toString());
			model.put("content", "Hello World");
			return model;
		}


}
