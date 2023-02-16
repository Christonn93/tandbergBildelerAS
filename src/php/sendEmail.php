<?php
// Get form data
$request_body = file_get_contents('php://input');
$data = json_decode($request_body);
$navn = $data->navn;
$epost = $data->epost;
$melding = $data->melding;

// Create email message
$to = "christopher.tonnesland@gmail.com";
$subject = "Ny melding fra kontakt skjema";
$message = "Navn: " . $navn . "\n\n" . "Epost: " . $epost . "\n\n" . "Melding: " . $melding;
$headers = "From: " . $epost;

// Send email
mail($to, $subject, $message, $headers);

// Send a JSON response back to the client
$response = array("status" => "success");
echo json_encode($response);
?>