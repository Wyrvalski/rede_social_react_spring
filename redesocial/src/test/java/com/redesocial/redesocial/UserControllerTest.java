package com.redesocial.redesocial;

import static org.assertj.core.api.Assertions.assertThat;

import com.redesocial.redesocial.error.ApiError;
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
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

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
		postSignup(user, GenericResponse.class);
		assertThat(userRepository.count()).isEqualTo(1);
	}

	@Test
	public void cadastrarUsuario_QuandoValido_ReceberOk() {
		User user = createUser();

		ResponseEntity<Object> response = postSignup(user, Object.class);

		assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
	}

	@Test
	public void cadastrarUsuario_QuandoValido_ReceberSucesso() {
		User user = createUser();

		ResponseEntity<GenericResponse> response = postSignup(user, GenericResponse.class);
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

	@Test
	public void cadastrarUsuario_quandoForNull_receberBadRequest() {
		User user = createUser();
		user.setUsername(null);
		ResponseEntity<Object> response = postSignup(user, Object.class);
		assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
	}

	@Test
	public void cadastrarNome_quandoForNull_receberBadRequest() {
		User user = createUser();
		user.setName(null);
		ResponseEntity<Object> response = postSignup(user, Object.class);
		assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
	}

	@Test
	public void cadastrarSenha_quandoForNull_receberBadRequest() {
		User user = createUser();
		user.setPassword(null);
		ResponseEntity<Object> response = postSignup(user, Object.class);
		assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
	}

	@Test
	public void cadastrarUsuario_quandoForMenorQue3Characteres_receberBadRequest() {
		User user = createUser();
		user.setUsername("edu");
		ResponseEntity<Object> response = postSignup(user, Object.class);
		assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
	}

	@Test
	public void cadastrarNome_quandoForMenorQue3Characteres_receberBadRequest() {
		User user = createUser();
		user.setName("edu");
		ResponseEntity<Object> response = postSignup(user, Object.class);
		assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
	}

	@Test
	public void cadastrarSenha_quandoForSoletrasMinusculas_receberBadRequest() {
		User user = createUser();
		user.setPassword("senhas");
		ResponseEntity<Object> response = postSignup(user, Object.class);
		assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
	}

	@Test
	public void cadastrarSenha_quandoForSoletrasMaiusculas_receberBadRequest() {
		User user = createUser();
		user.setPassword("SENHAS");
		ResponseEntity<Object> response = postSignup(user, Object.class);
		assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
	}

	@Test
	public void cadastrarUsuario_quandoUsuarioTiverMaisQueOLimiteDeCaracteres_receberBadRequest() {
		User user = createUser();
		String valueOf101Chars = IntStream.rangeClosed(1,101).mapToObj(x -> "a").collect(Collectors.joining());
		user.setUsername(valueOf101Chars);
		ResponseEntity<Object> response = postSignup(user, Object.class);
		assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
	}

	@Test
	public void cadastrarNome_quandoUsuarioTiverMaisQueOLimiteDeCaracteres_receberBadRequest() {
		User user = createUser();
		String valueOf101Chars = IntStream.rangeClosed(1,101).mapToObj(x -> "a").collect(Collectors.joining());
		user.setName(valueOf101Chars);
		ResponseEntity<Object> response = postSignup(user, Object.class);
		assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
	}

	@Test
	public void cadastrarSenha_quandoSenhaoTiverMaisQueOLimiteDeCaracteres_receberBadRequest() {
		User user = createUser();
		String valueOf101Chars = IntStream.rangeClosed(1,101).mapToObj(x -> "a").collect(Collectors.joining());
		user.setPassword(valueOf101Chars + "A1");
		ResponseEntity<Object> response = postSignup(user, Object.class);
		assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
	}

	@Test
    public void cadastrarUsuario_quandoInvalido_receberErro() {
	    User user = new User();
	    ResponseEntity<ApiError> response = postSignup(user, ApiError.class);
	    assertThat(response.getBody().getUrl()).isEqualTo(API_USER);
    }

	public void cadastrarUsuario_quandoInvalido_receberMensagemDeErro() {
		User user = new User();
		ResponseEntity<ApiError> response = postSignup(user, ApiError.class);
		assertThat(response.getBody().getValidationErrors().size()).isEqualTo(3);
	}

	@Test
	public void cadastrarUsuario_quandoUsuarioNulo_receberErro() {
		User user = createUser();
		user.setUsername(null);
		ResponseEntity<ApiError> response = postSignup(user, ApiError.class);
		Map<String, String> validationErrors = response.getBody().getValidationErrors();
		assertThat(validationErrors.get("username")).isEqualTo("Usuario nao pode ser nulo");
	}

	@Test
	public void cadastrarNome_quandoNomeNulo_receberErro() {
		User user = createUser();
		user.setName(null);
		ResponseEntity<ApiError> response = postSignup(user, ApiError.class);
		Map<String, String> validationErrors = response.getBody().getValidationErrors();
		assertThat(validationErrors.get("name")).isEqualTo("Nome nao pode ser nulo");
	}

	@Test
	public void cadastrarSenha_quandoSenhaNula_receberErro() {
		User user = createUser();
		user.setPassword(null);
		ResponseEntity<ApiError> response = postSignup(user, ApiError.class);
		Map<String, String> validationErrors = response.getBody().getValidationErrors();
		assertThat(validationErrors.get("password")).isEqualTo("Senha nao pode ser nula");
	}

	@Test
	public void cadastrarSenha_quandoSenhaForaDoTamanhoCerto_receberErro() {
		User user = createUser();
		user.setPassword("s4D");
		ResponseEntity<ApiError> response = postSignup(user, ApiError.class);
		Map<String, String> validationErrors = response.getBody().getValidationErrors();
		assertThat(validationErrors.get("password")).isEqualTo("Deve haver no minimo 6 characteres e no maximo 100");
	}

	@Test
	public void cadastrarSenha_quandoSenhaSemCaracteresMaiusculosMinusculosENumeros_receberErro() {
		User user = createUser();
		user.setPassword("abcdefsf");
		ResponseEntity<ApiError> response = postSignup(user, ApiError.class);
		Map<String, String> validationErrors = response.getBody().getValidationErrors();
		assertThat(validationErrors.get("password")).isEqualTo("Deve haver letras maiusculas, minusculas e numeros");
	}

	@Test
    public void cadastrarUsuario_quandoJaHouverUmUsuarioIgual_receberErro() {
	    userRepository.save(createUser());
	    User user = createUser();

	    ResponseEntity<Object> response = postSignup(user, Object.class);
	    assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

	@Test
	public void cadastrarUsuario_quandoJaHouverUmUsuarioIgual_receberMenssagem() {
		userRepository.save(createUser());
		User user = createUser();

		ResponseEntity<ApiError> response = postSignup(user, ApiError.class);
		Map< String, String> validationErrors = response.getBody().getValidationErrors();
		assertThat(validationErrors.get("username")).isEqualTo("Nome ja existe");
	}

	public <T> ResponseEntity<T> postSignup(Object request, Class<T> response) {
		return testRestTemplate.postForEntity(API_USER, request, response);
	}


	private User createUser() {
		User user = new User();
		user.setUsername("user");
		user.setName("display");
		user.setPassword("Casa@2417");
		return user;
	}
}
