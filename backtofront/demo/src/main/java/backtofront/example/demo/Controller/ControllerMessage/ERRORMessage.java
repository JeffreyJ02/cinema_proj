package backtofront.example.demo.Controller.ControllerMessage;

public class ERRORMessage {
    @SuppressWarnings("FieldMayBeFinal")
    private String error;

    public ERRORMessage(String error) {
        this.error = error;
    }

    @SuppressWarnings("unused")
    public String getError() {
        return error;
    }
}
