// I haven't completely figured out if this is bad practice yet.
// The following creates a global variable (OMG!) that acts as our storage
// for our global event bus.

var GlobalEvents = {}; // Global event system.
$GlobalEvents = $(GlobalEvents);

// In the future, GlobalEvents may be extended with more structure to support
// a full-fledged observer pattern.
