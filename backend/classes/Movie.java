package backend.classes;

public class Movie {
    String title, rating, trailer, category, poster, synopsis;
    // 0 is month, 1 is day
    byte startDate[] = new byte[2];

    Movie() {
        title = rating = trailer = category = poster = synopsis = "";
        startDate = new byte[2];
    }
}