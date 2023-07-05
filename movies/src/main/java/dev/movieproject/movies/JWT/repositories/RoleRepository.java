package dev.movieproject.movies.JWT.repositories;

import dev.movieproject.movies.JWT.models.ERole;
import dev.movieproject.movies.JWT.models.Role;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RoleRepository extends MongoRepository<Role, String> {
    Optional<Role> findByName(ERole name);
}
