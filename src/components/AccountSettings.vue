<template>
  <div class="card">
    <div class="card-header w-100">
      <h3 style="float: left">Account</h3>
    </div>
    <b-row class="card-body">
      <b-col sm="8" class="text-left">
        <p>
          <strong>
            <u>Email:</u>
          </strong> garygoat@gmail.com
        </p>
        <p>
          <strong>
            <u>Password:</u>
          </strong> ***********
        </p>
      </b-col>
      <b-col sm="4">
        <button type="button" class="btn btn-sm btn-link">Change Email</button>
        <button type="button" class="btn btn-sm btn-link">Change Password</button>
      </b-col>
    </b-row>
  </div>
</template>
<script>
export default {
  name: "AccountSettings"
};
</script>