package com.redesocial.redesocial.user;


import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Data
@Entity
public class User {
    @Id
    @GeneratedValue
    private long id;

    @NotNull(message = "Usuario nao pode ser nulo")
    @Size(min = 4, max= 100, message = "Deve haver no minimo 4 characteres e no maximo 100")
    @UniqueUsername
    private String username;

    @NotNull(message = "Nome nao pode ser nulo")
    @Size(min = 4, max = 100, message = "Deve haver no minimo 4 characteres e no maximo 100")
    private String name;

    @NotNull(message = "Senha nao pode ser nula")
    @Size(min = 6, max = 100, message = "Deve haver no minimo 6 characteres e no maximo 100")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$", message = "Deve haver letras maiusculas, minusculas e numeros")
    private String password;
}
