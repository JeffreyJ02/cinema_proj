package backend.classes;

public class Ticket {
    Movie movie;
    String showtime, showdate, seat;
    // ageCategory, ageCatagoryTitles, and price of ticket
    // are relative to one another. 0 : General Ticket : $10.00 pretax
    final String[] ageCategoryTitles = {"General", "Student", "Child/Senior"};
    final double[] price = {10.00, 7.00, 5.00};
    int ageCategory;

    public Ticket() {
        movie = new Movie();
        showtime = showdate = seat = "";
        ageCategory = 0;
    }
}
