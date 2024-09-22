package backend.classes;

public class Cart {
    // our theater has 80 available seats
    Ticket order[];
    // Georgia state tax
    final double tax = 0.04;

    public Cart() {
        order = new Ticket[80];
    }

    public double OrderTotal() {
        double total = 0;
        for (Ticket ticket : order)
            total += ticket.price[ticket.ageCategory];
        return total * tax;
    }
}