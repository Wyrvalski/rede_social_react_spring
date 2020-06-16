package com.redesocial.redesocial;

import static org.assertj.core.api.Assertions.assertThat;

import com.redesocial.redesocial.shared.GenericResponse;
import com.redesocial.redesocial.user.User;
import com.redesocial.redesocial.user.UserRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class UserControllerTest {

	public static final String API_USER = "/api/user";
	@Autowired
	TestRestTemplate testRestTemplate;

	@Autowired
	UserRepository userRepository;


	@Before
	public void cleanup() {
		userRepository.deleteAll();
	}

	@Test
	public void cadastrarUsuario_QuandoValido_SalvarNoBanco() {
		User user = createUser();
		testRestTemplate.postForEntity(API_USER, user, Object.class);
		assertThat(userRepository.count()).isEqualTo(1);
	}

	@Test
	public void cadastrarUsuario_QuandoValido_ReceberOk() {
		User user = createUser();

		ResponseEntity<Object> response = testRestTemplate.postForEntity(API_USER, user, Object.class);

		assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
	}

	@Test
	public void cadastrarUsuario_QuandoValido_ReceberSucesso() {
		User user = createUser();

		ResponseEntity<GenericResponse> response = testRestTemplate.postForEntity(API_USER, user, GenericResponse.class);
		assertThat(response.getBody().getMessage()).isNotNull();
	}

	@Test
	public void cadastrarUsuario_QuandoValido_criaHashPassword() {
		User user = createUser();
		testRestTemplate.postForEntity(API_USER, user, Object.class);
		List<User> users = userRepository.findAll();
		User inDB = users.get(0);
		assertThat(inDB.getPassword()).isNotEqualTo(user.getPassword());
	}

	private User createUser() {
		User user = new User();
		user.setUsername("user");
		user.setName("display");
		user.setPassword("password");
		return user;
	}
}
