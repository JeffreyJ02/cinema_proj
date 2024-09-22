package backtofront.example.demo.Admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/adminbubicua")
public class AdminDashboardController {

    @GetMapping("/dashboard")
    public String showdashboard() {
        return "admindashboard"; 
    }
}


