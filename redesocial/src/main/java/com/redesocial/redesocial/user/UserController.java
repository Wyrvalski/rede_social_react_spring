package com.redesocial.redesocial.user;


import com.redesocial.redesocial.shared.GenericResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/api/user")
    GenericResponse createUSer(@Valid @RequestBody User user) {
        userService.save(user);
        return new GenericResponse("Usuario cadastrado!");
    }
}
