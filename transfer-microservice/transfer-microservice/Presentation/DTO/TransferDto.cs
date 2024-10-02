using System.ComponentModel.DataAnnotations;

namespace transfer_microservice.Presentation.DTO
{
    public class TransferDto
    {
        [Required]
        public Guid AccountFrom { get; set; }

        [Required]
        public Guid AccountTo { get; set; }

        [Required]
        [Range(0.01, double.MaxValue, ErrorMessage = "Amount must be greater than zero.")]
        public decimal Amount { get; set; }
    }
}
