namespace transfer_microservice.Domain.Entities
{
    public class Transfer
    {
        public Guid TransferId { get; set; }
        public Guid AccountFrom { get; set; }
        public Guid AccountTo { get; set; }
        public decimal Amount { get; set; }
        public DateTime TransferDate { get; set; }

        // Construtor
        public Transfer()
        {
            TransferId = Guid.NewGuid();
        }

        public bool IsValid()
        {
            // Valida se o valor é maior que zero e se as contas são diferentes
            return Amount > 0 && AccountFrom != AccountTo;
        }
    }
}
