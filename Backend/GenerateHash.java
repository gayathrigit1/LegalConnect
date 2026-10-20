
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class GenerateHash {
    public static void main(String[] args) {
        String hash = new BCryptPasswordEncoder()
                .encode("Admin@12345");
        System.out.println(hash);
    }
}
