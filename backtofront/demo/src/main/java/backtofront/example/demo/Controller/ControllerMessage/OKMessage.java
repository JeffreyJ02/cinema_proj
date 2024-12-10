package backtofront.example.demo.Controller.ControllerMessage;

public class OKMessage {
    @SuppressWarnings("FieldMayBeFinal")
    private String message;

    public OKMessage(String message) {
        this.message = message;
    }

    @SuppressWarnings("unused")
    public String getMessage() {
        return message;
    }
}