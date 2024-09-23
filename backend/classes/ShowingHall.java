package backend.classes;

public class ShowingHall {
    // our showing halls have 8 columns and 10 rows. Seat letters are rows
    // and seat numbers are columns.
    boolean seatTaken[][];
    
    char seatLetter;
    char seatNumber;

    public ShowingHall() {
        seatTaken = new boolean[8][10];
        seatLetter = 65;
        seatNumber = 48;
    }

    // boolean reserve is to tell the function what to do with the seat.
    // reserve = true  : function should reserve the seat
    // reserve = false : function should unreserve the seat
    public void ManageSeat(boolean reserve, char seatLetter, char seatNumber) {
        // seatLetter-65 because ASCII code of A is 65
        // seatNumber-49 because ASCII code of 1 is 49 
        seatTaken[seatLetter-65][seatNumber-49] = reserve;
    }
}
