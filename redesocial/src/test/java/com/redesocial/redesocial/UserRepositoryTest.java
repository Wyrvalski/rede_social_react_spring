package com.redesocial.redesocial;


import com.redesocial.redesocial.user.User;
import com.redesocial.redesocial.user.UserRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@DataJpaTest
@ActiveProfiles("test")
public class UserRepositoryTest {

    @Autowired
    TestEntityManager testEntityManager;

    @Autowired
    UserRepository userRepository;

    @Test
    public void buscarUsername_quandoExistir_retornarUsuario() {
        User user = new User();

        user.setUsername("user");
        user.setName("display");
        user.setPassword("Casa@2417");

        testEntityManager.persist(user);

        User inDB = userRepository.findByUsername("user");
        assertThat(inDB).isNotNull();
    }

    @Test
    public void buscarUsername_quandoNaoExistir_retornarNull() {
        User inDB = userRepository.findByUsername("naoexiste");
        assertThat(inDB).isNull();
    }

}
