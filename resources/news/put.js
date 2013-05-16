if (!me || !me.roles || me.roles.indexOf('news') == -1) {
  cancel("You are not allowed to change news.", 401);
}