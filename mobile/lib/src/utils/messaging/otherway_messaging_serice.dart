class OtherwayMessagingService  :  FirebaseMessagingService() {

    override fun onNewToken(token: String) {
        super.onNewToken(token)
        val currentUser = FirebaseAuth.getInstance().currentUser?.uid
        if(currentUser != null){
            FirebaseFirestore.getInstance().collection("user").document(currentUser).update("deviceToken",token)
        }
    }
}