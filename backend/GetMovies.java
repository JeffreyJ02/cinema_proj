package backend;
import java.sql.*;

public class GetMovies {
    public static void main(String args[]) {
        Connection con = null;
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            con = DriverManager.getConnection(
                "jdbc:mysql://172.225.246.180:3306/mydb", 
                "mysql", null);
            
            Statement statement;
            statement = con.createStatement();
            ResultSet result;
            result = statement.executeQuery("select * from movie");
            while (result.next()) {
                System.out.println(result.getString("title"));
            }
        }
        catch (Exception e) {
            System.out.println(e);
        }
    }
}